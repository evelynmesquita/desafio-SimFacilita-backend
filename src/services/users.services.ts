import bcrypt from 'bcrypt';
import { usersRepository } from '../repositories/users.repository';
import { InputSession, InputUsers, SessionResponse, Users } from '../protocols';
import {
  actualPasswordError,
  emailAlreadyExistsError,
  emailNotExistsError,
  invalidDataError,
  invalidPasswordError,
  notFoundProfileError,
} from '../errors/errors';

async function createUserRegister(
  name: string,
  lastName: string,
  birthday: Date,
  phone: string,
  email: string,
  password: string,
  profileUrl: string,
): Promise<Users> {
  const userData: InputUsers = { name, lastName, birthday, phone, email, password, profileUrl };

  const emailRegistered = await usersRepository.findUsers(userData.email);

  if (emailRegistered) throw emailAlreadyExistsError('This email already exists!');

  const userRegister = await usersRepository.createUserRegister(userData);

  return userRegister;
}

async function createUserLogin(email: string, password: string): Promise<SessionResponse> {
  const loginData: InputSession = { email, password };

  const emailRegistered = await usersRepository.findUsers(loginData.email);
  if (!emailRegistered) throw emailNotExistsError('This email not exist.');

  const correctPassword = bcrypt.compareSync(password, emailRegistered.password);
  if (!correctPassword) throw invalidPasswordError('This password is not correct.');

  const userLogin = await usersRepository.createUserLogin(emailRegistered.id);

  return userLogin;
}

async function getProfileById(id: number) {
  if (!id || isNaN(id)) throw invalidDataError('id does not exist');
  const profile = await usersRepository.findUserProfileById(id);
  if (!profile) throw notFoundProfileError('Not able to find the profile');
  return profile;
}

async function updateUserProfile(
  id: number,
  name: string,
  lastName: string,
  birthday: Date,
  phone: string,
  email: string,
  profileUrl: string,
) {
  if (!id || isNaN(id)) throw invalidDataError('id does not exist');

  const profile = await usersRepository.findUserProfileById(id);
  if (!profile) throw notFoundProfileError('Not able to find the profile');

  const user = await usersRepository.existingUser(email, id);
  if (user) throw emailAlreadyExistsError('This email already exist');

  const userNewData = { id, name, lastName, birthday, phone, email, profileUrl };
  const result = await usersRepository.updateUserProfile(userNewData);
  return result;
}

async function findAllUsers() {
  const allUsers = await usersRepository.findAllUsers();
  return allUsers;
}

async function deleteUserProfile(id: number) {
  if (!id || isNaN(id)) throw invalidDataError('id does not exist');

  const profile = await usersRepository.findUserProfileById(id);
  if (!profile) throw notFoundProfileError('Not able to find the profile');

  const userDelete = await usersRepository.deleteUserProfile(id);
  return userDelete;
}

async function updatePassword(id: number, actualPassword: string, newPassword: string) {
  const hash = bcrypt.hashSync(newPassword, 10) 
  const userNewData = { id, newPassword: hash };

  const user = await usersRepository.findPasswordByUserId(id);
  const correctPassword = bcrypt.compareSync(actualPassword, user.password);
  if(!correctPassword) throw actualPasswordError("This is not your actual password");

  const result = await usersRepository.updatePasswordRepo(userNewData);
  return result;
}

async function getOtherUsersProfileById(id: number) {
  if (!id || isNaN(id)) throw invalidDataError('id does not exist');
  const profile = await usersRepository.findUserProfileById(id);
  if (!profile) throw notFoundProfileError('Not able to find the profile');
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
