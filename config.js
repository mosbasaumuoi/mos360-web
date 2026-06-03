// config.js

export const CONFIG = {
    TITLE: "MOS360",

    SHEET_URL:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",

    STUDENT_SHEET_URL:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjb4deEYb7i_AMpimoccuyElyPF01QfQGEue2nQNrlRjU4xZlz3tH1qJt3jPUN8gqRHiHJQqWJBo9E/pub?output=tsv",

    APPS_SCRIPT_URL: "",

    LOGO_URL: "",

    PASS_SCORE: 700,
    MAX_SCORE: 1000,
    QUESTION_COUNT: 45,
    MAX_DEVICES: 3,

    SHEET_EDIT_URL: "",

    SOCIALS: {
        facebook: "",
        youtube: "",
        tiktok: ""
    }
};

export function normalizePhone(phone) {
    return String(phone || "")
        .replace(/\D/g, "")
        .trim();
}