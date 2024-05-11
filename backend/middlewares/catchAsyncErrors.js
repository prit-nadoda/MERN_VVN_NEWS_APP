export const catchAsyncErrors = (Finction) => {
  return (req, res, next) => {
    Promise.resolve(Function(req, res, next)).catch(next);
  };
};
