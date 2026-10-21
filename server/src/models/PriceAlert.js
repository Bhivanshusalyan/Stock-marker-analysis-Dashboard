import mongoose from 'mongoose';

const priceAlertSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, symbol: { type: String, required: true, uppercase: true }, condition: { type: String, enum: ['above', 'below'], required: true }, target: { type: Number, required: true, min: 0 }, triggered: { type: Boolean, default: false } }, { timestamps: true });
export default mongoose.model('PriceAlert', priceAlertSchema);
