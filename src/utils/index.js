import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 



export const NumberWithCommas = (x) => {
    // return 4000;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  export function generateRandomString() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKQRSTUVWXYZ012345678945678934567';
    let result = 'Blake-';
  
    for (let i = 0; i < 4; i++) {
      result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
  
    return result;
  }
  
  
  
  export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Define an array to get the month name in the desired format
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Get the month in the desired format from the array
    const month = months[date.getMonth()];
  
    // Get the ordinal suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
  
    // Construct the formatted date string
    const formattedDate = `${ordinalDay} ${month} ${year}`;
    // const formattedDate = `${ordinalDay} ${month}`;
  
    return formattedDate;
  };

  export const Notify = (message, state) => {
    // toast("Default Notification !");
  
    if (state) {
      toast.error(message, {
        // position: toast.POSITION.TOP_Left
      });
    } else {
      toast.success(message, {
        // position: toast.POSITION.TOP_Left
      });
    }
  
    // toast.error("Error Notification !", {
    //     position: toast.POSITION.TOP_LEFT
    // });
  
    // toast.warn("Warning Notification !", {
    //     position: toast.POSITION.BOTTOM_LEFT
    // });
  
    // toast.info("Info Notification !", {
    //     position: toast.POSITION.BOTTOM_CENTER
    // });
  
    // toast("Custom Style Notification with css class!", {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     className: 'foo-bar'
    // });
  };
  