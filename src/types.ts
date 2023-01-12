export interface PaginatedResponse {
	total: number;
	pages: number;
	limit: number;
	items: Char[];
}

export interface Char {
	id: number;
	name: string;
	photo: string;
	charName: string;
}

export interface CharacherCard extends HTMLElement {
	render: () => void;
}