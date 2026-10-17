import { useAuth } from "@/context/authContext";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Divider, IconButton, TextField, Typography } from "@mui/material";

type AccountSettingsProps = {
    onClose: () => void;
    onLogout: () => Promise<void> | void;
};

export default function AccountSettings({ onClose, onLogout }: AccountSettingsProps) {
    const { localstorageUser, setLocalStorageUser } = useAuth();
    const [form, setForm] = useState({
        firstName: localstorageUser?.firstName || "",
        lastName: localstorageUser?.lastName || "",
        email: localstorageUser?.email || "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setForm({
            firstName: localstorageUser?.firstName || "",
            lastName: localstorageUser?.lastName || "",
            email: localstorageUser?.email || "",
        });
    }, [localstorageUser]);

    const handleChange = (field: "firstName" | "lastName") => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
        setError("");
    };

    const handleSave = () => {
        if (!form.firstName.trim() || !form.lastName.trim()) {
            setError("First name and last name are required.");
            return;
        }

        setSaving(true);

        const nextUser = {
            ...(localstorageUser || {
                authType: "email",
                createdAt: new Date().toISOString(),
                email: "",
                firebaseuid: "",
                firstName: "",
                id: "",
                lastName: "",
            }),
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email || localstorageUser?.email || "",
        };

        localStorage.setItem("user", JSON.stringify(nextUser));
        setLocalStorageUser(nextUser);
        setSaving(false);
        onClose();
    };

    const initials = `${localstorageUser?.firstName?.[0] || "U"}${localstorageUser?.lastName?.[0] || ""}`.toUpperCase();

    return (
        <div className="absolute left-1/2 top-1/2 w-[calc(100vw-20px)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.15)] md:rounded-2xl">
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3 md:px-6">
                <div>
                    <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 700, fontSize: { xs: 20, md: 24 } }}>
                        Account settings
                    </Typography>
                </div>

                <IconButton
                    onClick={onClose}
                    aria-label="Close settings"
                    sx={{
                        width: 36,
                        height: 36,
                        border: "1px solid #e2e8f0",
                        borderRadius: 1.5,
                        color: "#475569",
                        background: "#f8fafc",
                        "&:hover": { background: "#eef2f7" },
                    }}
                >
                    <XIcon size={16} />
                </IconButton>
            </div>

            <div className="max-h-[78vh] overflow-y-auto p-4 md:p-6">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-5">
                        <section>
                            <Typography variant="subtitle2" sx={{ color: "#64748b", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", mb: 2 }}>
                                Profile
                            </Typography>

                            <div className="space-y-3">
                                <TextField
                                    label="First name"
                                    value={form.firstName}
                                    onChange={handleChange("firstName")}
                                    fullWidth
                                    size="small"
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                                <TextField
                                    label="Last name"
                                    value={form.lastName}
                                    onChange={handleChange("lastName")}
                                    fullWidth
                                    size="small"
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                                <TextField
                                    label="Email"
                                    value={form.email}
                                    fullWidth
                                    size="small"
                                    disabled
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </div>
                        </section>

                        <Divider />

                        <section>
                            <Typography variant="subtitle2" sx={{ color: "#64748b", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", mb: 2 }}>
                                Account & security
                            </Typography>

                            <div className="rounded-xl border border-[#e5e7eb] bg-[#f8fafc] p-3 text-sm text-slate-600">
                                <div className="flex items-center justify-between gap-3 py-1.5">
                                    <span>Signed in as</span>
                                    <span className="font-medium text-slate-800">{localstorageUser?.email || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 py-1.5">
                                    <span>Auth type</span>
                                    <span className="font-medium text-slate-800">{localstorageUser?.authType || "Email"}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-5">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dfe4ea] text-xl font-semibold text-slate-700">
                                {initials}
                            </div>
                            <Typography variant="h6" sx={{ mt: 2, color: "#0f172a", fontWeight: 700 }}>
                                {localstorageUser?.firstName || "User"} {localstorageUser?.lastName || ""}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#64748b" }}>
                                {localstorageUser?.email || "No email available"}
                            </Typography>
                        </div>

                        <div className="rounded-xl border border-[#e5e7eb] bg-[#f8fafc] p-3">
                            <Typography variant="subtitle2" sx={{ color: "#64748b", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", mb: 2 }}>
                                Actions
                            </Typography>

                            <button
                                type="button"
                                onClick={() => onLogout()}
                                className="w-full rounded-md border border-[#fecaca] bg-[#fff1f2] px-3 py-2 text-sm font-medium text-[#b91c1c] transition hover:bg-[#ffe4e6]"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 rounded-md border border-[#fecaca] bg-[#fff1f2] px-3 py-2 text-sm text-[#b91c1c]">
                        {error}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-[#e5e7eb] bg-[#fafafa] px-4 py-3 md:px-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-[#dfe4ea] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#f8fafc]"
                >
                    Cancel
                </button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        backgroundColor: "#111827",
                        boxShadow: "none",
                        px: 2.5,
                        py: 1,
                        "&:hover": { backgroundColor: "#1f2937" },
                    }}
                >
                    {saving ? "Saving..." : "Save changes"}
                </Button>
            </div>
        </div>
    );
}