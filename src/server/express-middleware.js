export default function middleware(options = {}) {
  return (req, res, next) => {
    console.log(`[Proxtem] ${req.method} ${req.url}`);
    next();
  };
}
