import friendsRepository from "./friend.repository.js";


export class friendsController{
    constructor(){
        this.friendRepository = new friendsRepository();
    }
// Get User Friend
    async  getUserFriendsController(req, res) {
        const userId = req.params.userId;
    
        try {
            const friends = await this.friendRepository.getUserFriends(userId);
            res.status(200).json({ friends });
        } catch (error) {
            console.error('Error getting user friends:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    // Get pending request

async getPendingFriendRequestsController(req, res) {
    const userId = req.params.userId;

    try {
        const pendingRequests = await this.friendRepository.getPendingFriendRequests(userId);
        res.status(200).json({ pendingRequests });
    } catch (error) {
        console.error('Error getting pending friend requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//toggle friendship
async toggleFriendshipController(req, res) {
    const { requesterId, recipientId } = req.body;

    try {
        const result = await this.friendRepository.toggleFriendship(requesterId, recipientId);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error toggling friendship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//accept and request

async acceptFriendRequestController(req, res) {
    const friendshipId = req.params.friendshipId;

    try {
        const result = await this.friendRepository.acceptFriendRequest(friendshipId);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async rejectFriendRequestController(req, res) {
    const friendshipId = req.params.friendshipId;

    try {
        const result = await this.friendRepository.rejectFriendRequest(friendshipId);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

}