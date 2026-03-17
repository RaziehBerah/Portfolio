type CropMode = "limit" | "fill";

export function cloudinaryUrl(
    url: string,
    width: number,
    crop: CropMode = "limit"
) {
    return url.replace(
        "/image/upload/",
        `/image/upload/f_auto,q_auto,c_${crop},w_${width}/`
    );
}

export function cloudinaryImage(url: string, width: number) {
    return cloudinaryUrl(url, width, "limit");
}

export function cloudinaryThumb(url: string, width: number) {
    return cloudinaryUrl(url, width, "fill");
}