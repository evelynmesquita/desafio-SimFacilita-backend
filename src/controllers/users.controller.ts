import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { usersService } from '../services/users.service';
import { InputPasswordChange, InputSession, InputUpdateUsers, InputUsers } from '../protocols';

export async function registerUser(req: Request, res: Response) {
    const { name, lastName, birthday, phone, email, password, profileUrl } = req.body as InputUsers;
    const result = await usersService.createUserRegister(
        name,
        lastName,
        birthday,
        phone,
        email,
        password,
        profileUrl
    );

    return res.status(httpStatus.CREATED).send(result);
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body as InputSession;
    const result = await usersService.createUserLogin(email, password);

    return res.status(httpStatus.CREATED).send(result);
}

export async function getProfileById(req: Request, res: Response) {
    const session = res.locals;
    const profile = await usersService.getProfileById(session.userId);
    res.status(httpStatus.OK).send(profile);
}

export async function updateProfileId(req: Request, res: Response) {
    const { name, lastName, birthday, phone, email, profileUrl } = req.body as InputUpdateUsers;
    const session = res.locals;
    const id = Number(session.userId);
    console.log("email em controller", email)
    const result = await usersService.updateUserProfile(id, name, lastName, birthday, phone, email, profileUrl);

    return res.status(httpStatus.OK).send(result);
}

export async function getAllUsers(_req: Request, res: Response) {
    const result = await usersService.findAllUsers();
    return res.status(httpStatus.OK).send(result);
}

export async function deleteProfileId(req: Request, res: Response) {
    const session = res.locals;
    const id = Number(session.userId);
    const result = await usersService.deleteUserProfile(id);
    return res.status(httpStatus.OK).send(result);
}

export async function updatePassword(req: Request, res: Response) {
    const { actualPassword, newPassword } = req.body as InputPasswordChange;
    const session = res.locals;
    const id = Number(session.userId);
    const result = await usersService.updatePassword(id, actualPassword, newPassword);

    return res.status(httpStatus.OK).send(result);
}

export async function getOtherUsersProfileById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const profile = await usersService.getOtherUsersProfileById(id);
    res.status(httpStatus.OK).send(profile);
}

export const usersController = {
    registerUser,
    loginUser,
    getProfileById,
    updateProfileId,
    getAllUsers,
    deleteProfileId,
    updatePassword,
    getOtherUsersProfileById
};
