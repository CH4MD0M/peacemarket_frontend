import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as emailApi from "@api/emailApi";
import useToastMessage from "@hooks/useToastMessage";
import { TOAST_MESSAGE } from "@util/toastMessage";

const initialState = {
  sendAuthCodeState: "READY",
  confirmAuthCodeState: "READY",
  codeExpirationState: false,
  timerState: false,
  isAutheticated: false,
  expirationTime: "",
};

// 인증번호 전송
export const sendAuthCode = createAsyncThunk("email/sendEmail", async (email, { rejectWithValue }) => {
  try {
    const response = await emailApi.sendEmail(email);
    console.log(response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

// 인증번호 확인
export const confirmAuthCode = createAsyncThunk("email/confirmEmail", async (authData, { rejectWithValue }) => {
  try {
    const response = emailApi.confirmEmail(authData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response);
  }
});

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    codeIsExpired(state, action) {
      state.codeExpirationState = action.payload;
    },
  },
  extraReducers: (builder) => {
    // sendAuthCode
    builder.addCase(sendAuthCode.pending, (state) => {
      state.sendAuthCodeState = "LOADING";
    });
    builder.addCase(sendAuthCode.fulfilled, (state, action) => {
      state.sendAuthCodeState = "SUCCESS";
      useToastMessage(TOAST_MESSAGE.AUTH.EMAIL_SUCCESS, "success");
      state.timerState = true;
      state.expirationTime = action.payload.data.expiresTime;
    });
    builder.addCase(sendAuthCode.rejected, (state) => {
      state.sendAuthCodeState = "ERROR";
      useToastMessage(TOAST_MESSAGE.AUTH.EXIST_USER, "error");
    });

    // confirmAuthCode
    builder.addCase(confirmAuthCode.pending, (state) => {
      state.confirmAuthCodeState = "LOADING";
    });
    builder.addCase(confirmAuthCode.fulfilled, (state, action) => {
      state.confirmAuthCodeState = "SUCCESS";
      useToastMessage(TOAST_MESSAGE.AUTH.CODE_SUCCESS, "success");
      state.timerState = false;
      state.isAutheticated = true;
    });
    builder.addCase(confirmAuthCode.rejected, (state) => {
      state.confirmAuthCodeState = "ERROR";
      useToastMessage(TOAST_MESSAGE.AUTH.CODE_FAIL, "error");
      state.timerState = false;
    });
  },
});

export const { codeIsExpired } = emailSlice.actions;
export default emailSlice.reducer;
