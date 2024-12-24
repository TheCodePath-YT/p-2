import { friendshipSchema } from "./friend.schema.js";
import mongoose from "mongoose";

const friendship = new mongoose.model('Friendship' , friendshipSchema)

export default class friendsRepository{

 async getUserFriends(userId) {
    try {
        const friendships = await friendship.find({
            $or: [
                { requester: userId, status: 'accepted' },
                { recipient: userId, status: 'accepted' }
            ]
        }).populate('requester recipient');

        // Extract friends from friendships
        const friends = friendships.map(friendship => {
            if (friendship.requester._id.toString() === userId.toString()) {
                return friendship.recipient;
            } else {
                return friendship.requester;
            }
        });

        return friends;
    } catch (error) {
        console.error('Error getting user friends:', error);
        throw error;
    }
}

// Managing Pending request
async getPendingFriendRequests(userId) {
    try {
        const pendingRequests = await friendship.find({
            recipient: userId,
            status: 'pending'
        }).populate('requester');

        return pendingRequests;
    } catch (error) {
        console.error('Error getting pending friend requests:', error);
        throw error;
    }
}

// toggle friendship
 async toggleFriendship(requesterId, recipientId) {
    try {
        const existingFriendship = await friendship.findOne({
            requester: requesterId,
            recipient: recipientId
        }) || await friendship.findOne({
            requester: recipientId,
            recipient: requesterId
        });

        if (existingFriendship) {
            // Friendship exists; remove it
            await Friendship.deleteOne({ _id: existingFriendship._id });
            return 'Friendship removed';
        } else {
            // Friendship does not exist; create it
            const newFriendship = new friendship({
                requester: requesterId,
                recipient: recipientId,
                status: 'pending'
            });
            await newFriendship.save();
            return 'Friendship request sent';
        }
    } catch (error) {
        console.error('Error toggling friendship:', error);
        throw error;
    }
}

// Accept and delete request

async acceptFriendRequest(friendshipId) {
    try {
        await friendship.findByIdAndUpdate(friendshipId, { status: 'accepted' });
        return 'Friend request accepted';
    } catch (error) {
        console.error('Error accepting friend request:', error);
        throw error;
    }
}

async rejectFriendRequest(friendshipId) {
    try {
        await friendship.findByIdAndUpdate(friendshipId, { status: 'rejected' });
        return 'Friend request rejected';
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        throw error;
    }
}
}