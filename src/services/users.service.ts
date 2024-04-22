import bcrypt from 'bcrypt';
import { usersRepository } from "../repositories/users.repository";
import { InputSession, InputUsers, SessionResponse, Users } from "../protocols";
import {
    actualPasswordError,
    emailAlreadyExistsError,
    emailNotExistsError,
    invalidDataError,
    invalidPasswordError,
    profileNotFoundError
} from "../errors/errors";

async function createUserRegister(
    name: string,
    lastName: string,
    birthday: Date,
    phone: string,
    email: string,
    password: string,
    profileUrl: string,
): Promise<Users> {
    const userData: InputUsers = {
        name,
        lastName,
        birthday,
        phone,
        email,
        password,
        profileUrl
    };
    const emailRegistered = await usersRepository.findUsers(userData.email);

    if (emailRegistered) throw emailAlreadyExistsError('This email already exists!');

    const userRegister = await usersRepository.createRegisterUser(userData);
    return userRegister;
};

async function createUserLogin(email: string, password: string): Promise<SessionResponse> {
    const loginData: InputSession = { email, password };

    const emailRegistered = await usersRepository.findUsers(loginData.email);
    if (!emailRegistered) throw emailNotExistsError('This email or password not exist.');

    const correctPassword = bcrypt.compareSync(password, emailRegistered.password);
    if (!correctPassword) throw invalidPasswordError('This email or password not exist.');

    const userLogin = await usersRepository.createLoginUser(emailRegistered.id);

    return userLogin;
};

async function getProfileById(id: number) {
    if (!id || isNaN(id)) throw invalidDataError('Id does not exists.');
    const profile = await usersRepository.findUserById(id);
    if (!profile) throw profileNotFoundError('Not able to find the profile.');
    return profile;
}

async function updateUserProfile(
    id: number,
    name: string,
    lastName: string,
    birthday: Date,
    phone: string,
    email: string,
    profileUrl: string
) {
    if (!id || isNaN(id)) throw invalidDataError('Invalid user ID.');

    const profile = await usersRepository.findUserById(id);
    if (!profile) throw profileNotFoundError('Profile not found.');


    const user = await usersRepository.userExists(email, id);
    if (user) throw emailAlreadyExistsError('Email already exists.');

    const userNewData = { id, name, lastName, birthday, phone, email, profileUrl };
    const result = await usersRepository.updateUserProfile(userNewData);
    return result;
}

async function findAllUsers() {
    const allUsers = await usersRepository.findAllUsers();
    return allUsers;
}

async function deleteUserProfile(id: number) {
    if (!id || isNaN(id)) throw invalidDataError('Invalid user ID.');

    const profile = await usersRepository.findUserById(id);
    if (!profile) throw profileNotFoundError('Profile not found.');

    const userDelete = await usersRepository.deleteUserProfile(id);
    return userDelete;
}

async function updatePassword(id: number, actualPassword: string, newPassword: string) {
    const hash = bcrypt.hashSync(newPassword, 10);
    const userNewData = { id, newPassword: hash };

    const user = await usersRepository.findPasswordByUserId(id);
    if (!user) throw profileNotFoundError('User not found.');

    const correctPassword = bcrypt.compareSync(actualPassword, user.password);
    if (!correctPassword) throw actualPasswordError("Incorrect actual password.");


    const result = await usersRepository.updatePassword(userNewData);
    return result;
}

async function getOtherUsersProfileById(id: number) {
    if (!id || isNaN(id)) throw invalidDataError('Invalid user ID.');

    const profile = await usersRepository.findUserById(id);
    if (!profile) throw profileNotFoundError('Profile not found.');

    return profile;
}

export const usersService = {
    createUserRegister,
    createUserLogin,
    getProfileById,
    updateUserProfile,
    findAllUsers,
    deleteUserProfile,
    updatePassword,
    getOtherUsersProfileById
};
