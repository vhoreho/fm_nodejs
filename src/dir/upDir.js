export const upDir = (path) => {
    return path.split('\\').length > 1 ? path.split('\\').slice(0, -1).join('\\') : path;
}