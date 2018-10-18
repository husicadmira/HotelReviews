const isAdmin = (req, res, next) => {
    if (req.user && req.user.roleId == 1)
        next();
    else {
        res.status(403).json({ message: "You are unauthorized for this action" }); // user is forbidden
    }
}

export { isAdmin }