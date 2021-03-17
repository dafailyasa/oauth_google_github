export interface CreateRepository {
    id: string;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
}

export class RepositoryResponseObject {
    id: string;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
}