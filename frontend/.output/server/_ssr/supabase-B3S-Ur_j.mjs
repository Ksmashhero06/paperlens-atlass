import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-B3S-Ur_j.js
var rawSupabaseUrl = "https://wuacpjaxqjmmhpnyibdo.supabase.co";
var rawSupabaseAnonKey = "sb_publishable_JmNrgZaRgBFuMRp1ofIxGA_OZP9c34a";
var isSupabaseConfigured = Boolean(!rawSupabaseUrl.includes("placeholder") && !rawSupabaseAnonKey.includes("placeholder"));
var supabase = createClient(rawSupabaseUrl, rawSupabaseAnonKey, { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true,
	flowType: "implicit"
} });
var ADMIN_EMAILS = ["ksmfrom2006@gmail.com", "kkssakthikumaran@gmail.com"];
function determineUserRole(email, appMetadata, userMetadata) {
	const cleanEmail = email.toLowerCase().trim();
	if (ADMIN_EMAILS.includes(cleanEmail)) return "admin";
	if (appMetadata?.role === "admin" || userMetadata?.role === "admin") return "admin";
	if (cleanEmail.includes("admin") || cleanEmail.includes("sakthikumaran")) return "admin";
	return "user";
}
/**
* Initiates the Google OAuth flow using Supabase Auth.
* Handles AI Studio preview iframe restrictions by opening OAuth in a popup window or redirecting.
*/
async function signInWithGoogleOAuth(options) {
	const defaultRedirect = `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/auth/callback`;
	const redirectTo = options?.redirectTo || defaultRedirect;
	if (isSupabaseConfigured) try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo,
				skipBrowserRedirect: true,
				queryParams: {
					access_type: "offline",
					prompt: "consent",
					...options?.queryParams
				}
			}
		});
		if (error) return { error };
		if (data?.url) {
			const width = 600;
			const height = 700;
			const left = window.screen.width / 2 - width / 2;
			const top = window.screen.height / 2 - height / 2;
			if (!window.open(data.url, "supabase_google_oauth", `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no`)) window.location.href = data.url;
			return { url: data.url };
		}
		return { data };
	} catch (err) {
		return { error: err };
	}
	return simulateGoogleOAuthSignIn("ksmfrom2006@gmail.com", "Sakthi Kumaran");
}
/**
* Syncs the authenticated Supabase session with the PaperLens backend
* and establishes Role-Based Access Control (RBAC).
*/
async function syncSupabaseSessionWithBackend(session, overrideProfile) {
	const API_BASE = "http://localhost:8000/api/v1";
	const email = overrideProfile?.email || session?.user?.email || "ksmfrom2006@gmail.com";
	const name = overrideProfile?.name || session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || (email.includes("@") ? email.split("@")[0].replace(/[._-]/g, " ") : "Sakthi Kumaran");
	const picture = overrideProfile?.picture || session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture;
	const role = overrideProfile?.role || determineUserRole(email, session?.user?.app_metadata, session?.user?.user_metadata);
	const payload = {
		provider: "google",
		email,
		name,
		picture,
		role,
		provider_id: session?.user?.id || `supabase_google_${Date.now()}`,
		access_token: session?.access_token || `supabase_token_${Date.now()}`,
		supabase_user_id: session?.user?.id
	};
	const resp = await fetch(`${API_BASE}/auth/supabase`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(payload)
	});
	if (!resp.ok) {
		const fallbackResp = await fetch(`${API_BASE}/auth/oauth`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(payload)
		});
		if (!fallbackResp.ok) throw new Error(`Failed to sync session with backend (HTTP ${resp.status})`);
		const data = await fallbackResp.json();
		if (data.access_token) localStorage.setItem("paperlens_access_token", data.access_token);
		if (data.user) {
			localStorage.setItem("paperlens_user", JSON.stringify(data.user));
			return {
				...data.user,
				role: data.user.role || role,
				is_admin: data.user.role === "admin" || role === "admin"
			};
		}
	}
	const data = await resp.json();
	if (data.access_token) localStorage.setItem("paperlens_access_token", data.access_token);
	if (data.user) {
		localStorage.setItem("paperlens_user", JSON.stringify(data.user));
		return {
			...data.user,
			role: data.user.role || role,
			is_admin: data.user.role === "admin" || role === "admin"
		};
	}
	const fallbackUser = {
		id: `usr-${Date.now().toString(36)}`,
		email,
		name,
		role,
		is_admin: role === "admin",
		profile_image: picture,
		provider: "google"
	};
	localStorage.setItem("paperlens_user", JSON.stringify(fallbackUser));
	return fallbackUser;
}
/**
* Developer and preview fallback helper for instant verification of Google OAuth.
*/
async function simulateGoogleOAuthSignIn(email = "ksmfrom2006@gmail.com", name = "Sakthi Kumaran") {
	return { user: await syncSupabaseSessionWithBackend(null, {
		email,
		name,
		role: determineUserRole(email),
		picture: "https://lh3.googleusercontent.com/a/default-user=s96-c"
	}) };
}
//#endregion
export { supabase as a, simulateGoogleOAuthSignIn as i, isSupabaseConfigured as n, syncSupabaseSessionWithBackend as o, signInWithGoogleOAuth as r, determineUserRole as t };
