import { InputComment } from '../protocols';
import { invalidPostError } from '../errors/errors';
import { commentsRepository } from '../repositories/comments.repository';

async function createComment(userId: number, postId: number, comment: string) {
    const commentData: InputComment = { userId, postId, comment };
    const postExist = await commentsRepository.findPostById(postId);
    
    if (!postExist) throw invalidPostError('Post does not exist!');

    const newComment = await commentsRepository.createComment(commentData);
    return newComment;
}

export const commentsService = {
    createComment,
};
