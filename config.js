/* =========================
   MOS360 CONFIG V2026
   ========================= */

export const CONFIG = {
    TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
    LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",
    SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",
    STUDENT_SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjb4deEYb7i_AMpimoccuyElyPF01QfQGEue2nQNrlRjU4xZlz3tH1qJt3jPUN8gqRHiHJQqWJBo9E/pub?output=tsv",
    // Google Apps Script webhook để ghi vào Sheet
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx_5R2iNh744oh7Y508YUyrdHR7LDALBnLRzmnN4aJecwu3kmU0DNykoLZXg5-tyxRL/exec",

    SOCIALS: {
        ZALO: "https://zalo.me/0912888360",
        FACEBOOK: "https://facebook.com/mos360.vn",
        MESSENGER: "https://m.me/mos360.vn",
        YOUTUBE: "https://youtube.com/@mos360_vn",
        TIKTOK: "https://tiktok.com/@mos360.vn"
    },

    ADMIN: {
        USER: "admin@mos360",
        PASS: "Mos360"
    }
};

export const EXAM_CONFIG = {
    QUESTION_COUNT: 45,
    EXAM_DURATION: 50,
    PASS_SCORE: 700,
    MAX_SCORE: 1000,
    TRIAL_DURATION: 6
};

export const DEVICE_CONFIG = {
    MAX_DEVICES: 3
};

export const IMAGE_BASE_URL = "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/refs/heads/main/main/images/";

export const IMAGE_MAP = {
    // IC3 LEVEL 1 — ảnh minh họa câu hỏi
    "ic3_lv1_q08": "ic3-level1/ic3_lv1_q08_hardware.svg",
    "ic3_lv1_q09": "ic3-level1/ic3_lv1_q09_hardware.svg",
    "ic3_lv1_q20": "ic3-level1/ic3_lv1_q20_operating_system.svg",
    "ic3_lv1_q22": "ic3-level1/ic3_lv1_q22_security.svg",
    "ic3_lv1_q26": "ic3-level1/ic3_lv1_q26_software.svg",
    "ic3_lv1_q35": "ic3-level1/ic3_lv1_q35_network.svg",
    "ic3_lv1_q47": "ic3-level1/ic3_lv1_q47_data.svg",
    "ic3_lv1_q65": "ic3-level1/ic3_lv1_q65_software.svg",
    "ic3_lv1_q73": "ic3-level1/ic3_lv1_q73_security.svg",
    "ic3_lv1_q101": "ic3-level1/ic3_lv1_q101_digital_citizenship.svg",
    // IC3 LEVEL 1 — ảnh single có hình minh họa
    "ic3_lv1_q28": "ic3-level1/ic3_lv1_q28_sysinfo.svg",
    // IC3 LEVEL 1 — ảnh options cho image-select (câu 7)
    "ic3_lv1_q07_opt_a": "ic3-level1/ic3_lv1_q07_opt_a.svg",
    "ic3_lv1_q07_opt_b": "ic3-level1/ic3_lv1_q07_opt_b.svg",
    "ic3_lv1_q07_opt_c": "ic3-level1/ic3_lv1_q07_opt_c.svg",
    "ic3_lv1_q07_opt_d": "ic3-level1/ic3_lv1_q07_opt_d.svg",
    "ic3_lv1_q07_opt_e": "ic3-level1/ic3_lv1_q07_opt_e.svg",
    // IC3 LEVEL 2 — ảnh minh họa
    "ic3_lv2_q01": "ic3-level2/ic3_lv2_q01_hardware.svg",
    "ic3_lv2_q04": "ic3-level2/ic3_lv2_q04_software.svg",
    "ic3_lv2_q17": "ic3-level2/ic3_lv2_q17_network.svg",
    "ic3_lv2_q19": "ic3-level2/ic3_lv2_q19_data.svg",
    "ic3_lv2_q21": "ic3-level2/ic3_lv2_q21_security.svg",
    "ic3_lv2_q34": "ic3-level2/ic3_lv2_q34_data.svg",
    "ic3_lv2_q42": "ic3-level2/ic3_lv2_q42_software.svg",
    "ic3_lv2_q50": "ic3-level2/ic3_lv2_q50_security.svg",
    "ic3_lv2_q61": "ic3-level2/ic3_lv2_q61_hardware.svg",
    "ic3_lv2_q105": "ic3-level2/ic3_lv2_q105_network.svg",
    // IC3 LEVEL 3 — ảnh minh họa
    "ic3_lv3_q35": "ic3-level3/ic3_lv3_q35_iot.svg",
    "ic3_lv3_q41": "ic3-level3/ic3_lv3_q41_network.svg",
    "ic3_lv3_q43": "ic3-level3/ic3_lv3_q43_network.svg",
    "ic3_lv3_q46": "ic3-level3/ic3_lv3_q46_cloud.svg",
    "ic3_lv3_q48": "ic3-level3/ic3_lv3_q48_cloud.svg",
    "ic3_lv3_q52": "ic3-level3/ic3_lv3_q52_security.svg",
    "ic3_lv3_q59": "ic3-level3/ic3_lv3_q59_network.svg",
    "ic3_lv3_q66": "ic3-level3/ic3_lv3_q66_security.svg",
    "ic3_lv3_q75": "ic3-level3/ic3_lv3_q75_tech.svg",
    "ic3_lv3_q82": "ic3-level3/ic3_lv3_q82_ai.svg",
    // IC3 LEVEL 3 — ảnh single có hình minh họa
    "ic3_lv3_q86": "ic3-level3/ic3_lv3_q86_sysinfo.svg",
};

export function normalizePhone(raw) {
    let p = raw.trim();
    if (p.startsWith("+84")) p = "0" + p.slice(3);
    else if (p.startsWith("84") && p.length >= 11) p = "0" + p.slice(2);
    return p;
}

export function getImageUrl(key) {
    if (!key || !IMAGE_MAP[key]) return "";
    return IMAGE_BASE_URL + IMAGE_MAP[key];
}