import { environment } from "../environments/environment";

export const Global = {
    baseUrl: environment.baseUrl,
    saveBooking: "booking/saveUpdateBooking",
    getcity: "stateCity/getCity",
    getPackage: "package/getPackage",
    getCityDetail: "stateCity/getCityDetail",
    SaveUpdateCityDetail:"stateCity/SaveUpdateCityDetail"
}

export const AlertEnum = {
    Success: "Success",
    Info: "Info",
    Warning: "Warning",
    Error: "Error"
}

export const message = {
    nodata: "No Data Available",
    invalidOtp: "Invalid Otp",
    invalidid: "invalid login credential",
    otpverified: "Otp Verified",
    servererror: "server erro",
    login: "succesfully login",
    bookingsuccess: "Your request has been received ,We will contact you soon !",
    noPackageData: "Package Data Not Found",
    noCityDetailData: "Citydetail Data Not Found",
    currentlynopackage: "Don't have any package for your destination",
    currentlynotavailable: "Coming soon to your city",
    imageUploadLimit: "Only 13 Images Are Allow to upload",
    
}

export const path = {
    imgPath:"./assets/images/"
}

export const limits = {
    imageLimit: 13
}