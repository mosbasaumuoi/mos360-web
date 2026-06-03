// config.js

export const CONFIG = {
    TITLE: "MOS360",

    SHEET_URL:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",

    STUDENT_SHEET_URL:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjb4deEYb7i_AMpimoccuyElyPF01QfQGEue2nQNrlRjU4xZlz3tH1qJt3jPUN8gqRHiHJQqWJBo9E/pub?output=tsv",

    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx_5R2iNh744oh7Y508YUyrdHR7LDALBnLRzmnN4aJecwu3kmU0DNykoLZXg5-tyxRL/exec", 

    LOGO_URL: "",

    PASS_SCORE: 700,
    MAX_SCORE: 1000,
    QUESTION_COUNT: 45,
    MAX_DEVICES: 3,

    SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",

    SOCIALS: {
        ZALO: "https://zalo.me/0912888360",
        FACEBOOK: "https://facebook.com/mos360.vn",
        MESSENGER: "https://m.me/mos360.vn",
        YOUTUBE: "https://youtube.com/@mos360_vn",
        TIKTOK: "https://tiktok.com/@mos360.vn"
    },
};

export function normalizePhone(phone) {
    return String(phone || "")
        .replace(/\D/g, "")
        .trim();
}