import toast from "react-hot-toast";

export async function handleLogout() {
    try {
        const token = localStorage.getItem("token");

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        toast.success("Logged out successfully");

    } catch (error) {
        console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
}
