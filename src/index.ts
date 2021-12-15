import got from "got/dist/source";

interface UploadResponse {
	status: 201 | number;
	id: string;
	password: string;
	delete_password: string;
	download_url: string;
}

interface Metadata {
	status: 200 | number;
	content_type: string;
	content_length: number;
	filename: string;
}

/**
 * Download or view a file
 * @param id string
 * @param password string
 * @returns url to view or download
 */
const view = (id: string, password: string) =>
	`https://tempfiles.ninja/d/${id}/${password}`;

/**
 * Upload a file
 * @param file Buffer file
 * @param filename custom filename
 * @param maxviews maximum views
 * @returns UploadResponse
 */
const upload = async (file: Buffer, filename?: string, maxviews?: number) => {
	const response: UploadResponse = await got
		.post("https://tempfiles.ninja/api/upload", {
			searchParams: {
				filename,
				maxviews,
			},
			body: file,
		})
		.json();
	return response;
};

/**
 * Get metadata of a file
 * @param id string
 * @param password string
 * @returns Metadata
 */
const metadata = async (id: string, password: string) => {
	const response: Metadata = await got
		.get(`https://tempfiles.ninja/api/metadata/${id}/${password}`)
		.json();
	return response;
};

/**
 * Delete a file
 * @param id string
 * @param deletion_password string
 * @returns boolean
 */
const remove = async (id: string, deletion_password: string) => {
	const response: { status: 200 | number } = await got
		.delete(`https://tempfiles.ninja/api/delete/${id}/${deletion_password}`)
		.json();
	return response.status == 200;
};

export default {
	upload,
	metadata,
	remove,
	view,
};
