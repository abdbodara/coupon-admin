export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  const dayWithSuffix = getDayWithSuffix(day);

  return `${dayWithSuffix} ${month} ${year}`;
};

export const inputDateFormat = (originalDate) => {
  const date = new Date(originalDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const getDayWithSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const serializeObjectToQueryString = (object) => {
  try {
    const serialized = encodeURIComponent(JSON.stringify(object));
    return `data=${serialized}`;
  } catch (error) {
    console.log("Error serializing object:", error);
    return "";
  }
};