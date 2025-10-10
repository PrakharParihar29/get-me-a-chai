"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDB from "@/db/connectDB"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()

    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({username: to_username})
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Payment.create({ oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x;
}

/* export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
} */

export const fetchuser = async (username) => {
    await connectDB();
    const u = await User.findOne({ username });
    if (!u) return null;

    const user = u.toObject({ flattenObjectIds: true });

    return {
        ...user,
        _id: user._id?.toString?.(),
        createdAt: user.createdAt?.toISOString?.(),
        updatedAt: user.updatedAt?.toISOString?.(),
    };
};


/* export const fetchpayments = async (username) => {
    await connectDB()
    //find all payemnet sorted by decresing order of amount and fllaten object id
    let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean()
    return p
} */

export const fetchpayments = async (username) => {
    await connectDB();
    // const payments = await Payment.find({ to_user: username , done: true}).sort({ amount: -1 }).lean();
    let payments = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()

    return payments.map(p => ({
        ...p,
        _id: p._id?.toString?.(),
        oid: p.oid?.toString?.(),
        createdAt: p.createdAt?.toISOString?.(),
        updatedAt: p.updatedAt?.toISOString?.(),
    }));
};

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }
}