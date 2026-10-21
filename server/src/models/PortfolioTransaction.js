import mongoose from 'mongoose';

const portfolioTransactionSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, type: { type: String, enum: ['buy', 'sell'], required: true }, symbol: { type: String, required: true, uppercase: true, trim: true }, quantity: { type: Number, required: true, min: 0.0001 }, price: { type: Number, required: true, min: 0 }, tradeDate: { type: Date, required: true } }, { timestamps: true });
export default mongoose.model('PortfolioTransaction', portfolioTransactionSchema);
