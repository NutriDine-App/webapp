import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import app from "../../firebaseConfig";

export const auth = getAuth(app);
const passwordPolicy = {
  containsLowercaseLetter: /[a-z]/,
  containsUppercaseLetter: /[A-Z]/,
  containsNumericCharacter: /\d/,
  containsNonAlphanumericCharacter: /\W/,
  meetsMinPasswordLength: 8,
  meetsMaxPasswordLength: 20,
};

export function validatePassword(password) {
  let errorMessage = "Password does not meet the policy requirements: ";
  const requirements = [];

  if (!passwordPolicy.containsLowercaseLetter.test(password)) {
    requirements.push("at least one lowercase letter");
  }
  if (!passwordPolicy.containsUppercaseLetter.test(password)) {
    requirements.push("at least one uppercase letter");
  }
  if (!passwordPolicy.containsNumericCharacter.test(password)) {
    requirements.push("at least one number");
  }
  if (!passwordPolicy.containsNonAlphanumericCharacter.test(password)) {
    requirements.push("at least one special character");
  }
  if (password.length < passwordPolicy.meetsMinPasswordLength) {
    requirements.push(
      `a minimum length of ${passwordPolicy.meetsMinPasswordLength} characters`
    );
  }
  if (password.length > passwordPolicy.meetsMaxPasswordLength) {
    requirements.push(
      `a maximum length of ${passwordPolicy.meetsMaxPasswordLength} characters`
    );
  }

  const validationStatus = {
    isValid: requirements.length === 0,
    message: errorMessage + requirements.join(", "),
  };

  return validationStatus;
}

// SignIn Function
export const signIn = async (email, password, rememberMe = true) => {
  try {
    const persistenceType = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistenceType);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// SignOut Function
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Register Function
export const register = async (email, password) => {
  try {
    const validationStatus = validatePassword(password);
    if (!validationStatus.isValid) {
      throw new Error(validationStatus.message);
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    }
  } catch (error) {
    throw error;
  }
};

// Current User
export const getCurrentUser = () => {
  return auth.currentUser;
};
