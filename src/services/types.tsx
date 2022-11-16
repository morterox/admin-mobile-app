/***************************** LOGIN  ******************************/
export interface IAuthtenticate {
  identificationType: string;
  identification: string;
  password: string;
  email: string;
}

export interface IPasswordReset {
  identificationType: string;
  identification: string;
  email: string;
}

export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
  tokenId: string;
}

/***************************** INVITACION  ******************************/

export interface IInvitationAuthorize {}
export interface IInvitationDelete {}

export interface IInvitationQuery {}

export interface IInvitationCreate {}

export interface IInvitationUpdate {}

/***************************** VALUES  ******************************/

export interface IValues {}

/***************************** GENERAL  ******************************/

export interface ISupportRequest {
  tokenId: string;
  reason: string;
  comments: string;
}
