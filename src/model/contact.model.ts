export const ContactMappingKeys: (keyof Contact)[] = [
    'id',
    'first_name',
    'last_name',
    "address_line1",
    "address_line2",
    "address_town",
    "address_county",
    "address_post_code"
];

export interface Contact {
    id?: string
    first_name?: string
    last_name?: string
    address_line1?: string
    address_line2?: string
    address_town?: string
    address_county?: string
    address_post_code?: string
}
