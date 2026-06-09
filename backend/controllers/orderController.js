import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from 'razorpay'
import crypto from "crypto";

const currency='INR'

const razorpayInstance=new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const placeOrder= async(req,res)=>{
    try {
       const {userId,items,amount,address}=req.body
       const orderData={
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
       }
       const newOrder=new orderModel(orderData)
       await newOrder.save()
       await userModel.findByIdAndUpdate(userId,{cartData:{}})
       res.json({success:true,message:"Order Placed"})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
}

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = await orderModel.create(orderData);

        const options = {
            amount: amount * 100,
            currency,
            receipt: newOrder._id.toString()
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        await orderModel.findByIdAndUpdate(newOrder._id, {
            razorpayOrderId: razorpayOrder.id
        });

        res.json({
            success: true,
            order: razorpayOrder
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.json({
                success: false,
                message: "Invalid Signature"
            });
        }

        const order = await orderModel.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!order) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        order.payment = true;
        await order.save();

        await userModel.findByIdAndUpdate(
            order.userId,
            {
                cartData: {}
            }
        );

        return res.json({
            success: true,
            message: "Payment Verified"
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};
const allOrders= async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
       console.log(error)
       res.json({success:false,message:error.message})   
    }
}

const userOrders= async(req,res)=>{
    try {
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})  
    }
}

const updateStatus= async(req,res)=>{
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

export {verifyRazorpay,placeOrder,placeOrderRazorpay,allOrders,updateStatus,userOrders}
