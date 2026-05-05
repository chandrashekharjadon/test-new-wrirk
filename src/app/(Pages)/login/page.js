"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  setLoading,
  setError,
  setLoginStatus,
  setCrmSchlorData,
} from "@/app/features/crm/crmSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { crmSchlorData, loading, error, loginStatus } = useSelector(
    (state) => state.crm
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // ✅ REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    if (loginStatus && crmSchlorData?.id) {
      router.replace("/dashboard");
    }
  }, [loginStatus, crmSchlorData, router]);

  // 🔹 SEND OTP
  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL3}scholar/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
      } else {
        dispatch(setError(data.message || "Failed to send OTP"));
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL3}scholar/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: Number(otp),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        dispatch(setCrmSchlorData(data?.data));
        dispatch(setLoginStatus(true));

        router.replace("/dashboard");
      } else {
        dispatch(setError(data.message || "Invalid OTP"));
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/Images/login_image .avif')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-[360px] p-8 rounded-2xl bg-white/90 shadow-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login with OTP
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!otpSent && (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        {otpSent && (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full mt-4 mb-4 px-4 py-2 border rounded-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}