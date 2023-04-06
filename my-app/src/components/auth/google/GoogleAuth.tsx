import { useEffect } from "react";

const GoogleAuth = () => {

    const handleGoogleLogin = (resp: any) => {
        console.log("Google resp: ", resp);
        const token = resp.credential;
        console.log(token);

    }

    useEffect(() => {
        //global google
        window.google.accounts!.id.initialize({
            client_id: "382123106336-toknmg0d0v1ooglft461i6i86u68a87a.apps.googleusercontent.com",
            callback: handleGoogleLogin
        });

        window.google.accounts!.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline", size: "small"
        });

    }, []);

    return (
        <>
            <div id="signInDiv"></div>
        </>
    );
}
export default GoogleAuth;