"use server"

import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simple validation (in real app, you'd verify against database)
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    }
  }

  // Simulate successful login
  const cookieStore = await cookies()
  cookieStore.set("auth-token", "mock-jwt-token", {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return {
    success: true,
    message: "Login successful",
    user: {
      email,
      name: email.split("@")[0],
    },
  }
}

export async function signupAction(formData: FormData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    }
  }

  // Simulate successful signup
  const cookieStore = await cookies()
  cookieStore.set("auth-token", "mock-jwt-token", {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return {
    success: true,
    message: "Account created successfully",
    user: {
      email,
      name,
    },
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")

  return {
    success: true,
    message: "Logged out successfully",
  }
}
