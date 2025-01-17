export type ExpoGoogleAuthenticationConfigureProps = {
    webClientId: string;
    profileImageSize?: number;
    iOSClientId?: string;
    nonce?: string;
};
export type ExpoGoogleAuthenticationLoginResponse = {
    displayName?: string;
    familyName?: string;
    givenName?: string;
    email?: string;
    id?: string;
    idToken: string;
    phoneNumber?: string;
    profilePictureUri?: string;
};
//# sourceMappingURL=ExpoGoogleAuthentication.types.d.ts.map