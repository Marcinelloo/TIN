export const mapToOptionsDisplay = (array, fieldLabel) => {
  return array.map((arr) => {
    return { label: arr[fieldLabel], value: arr._id };
  });
};
