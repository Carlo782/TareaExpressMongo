import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    userId:{
        type:String,
        required:true,
    },
    text: {
      type: String,
      required: true,
    },

  },
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
