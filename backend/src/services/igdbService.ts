export interface IGDBOptions {
    endpoint: string;
    fields: string[];
    search?: string;
    limit?: number;
    where?: string;
}

export class IGDBService {
    //Memória do Servidor (Cache do token de acesso)
    private static currentToken: string | null = null;
    private static tokenExpiration: number = 0;

    // Gerador de token de acesso
    static async getAccessToken() {
        if (this.currentToken && Date.now() < this.tokenExpiration - 3600000) {
            return this.currentToken;
        }

        console.log("Gerando um NOVO token da Twitch na API...");

        const clientId = process.env.IGDB_CLIENT_ID;
        const clientSecret = process.env.IGDB_CLIENT_SECRET;

        const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
            method: 'POST'
        });

        if (!response.ok) throw new Error("Falha ao gerar o token da Twitch");
        
        const data = await response.json();
        
        this.currentToken = data.access_token;
        this.tokenExpiration = Date.now() + (data.expires_in * 1000);

        return this.currentToken;
    }

    // Função genérica para queries no IGDB
    static async fazerQuery(opcoes: IGDBOptions) {
        const token = await this.getAccessToken();
        const clientId = process.env.IGDB_CLIENT_ID as string;

        let queryBody = `fields ${opcoes.fields.join(', ')};`;

        if (opcoes.search) {
            queryBody += ` search "${opcoes.search}";`;
        }

        if (opcoes.where) {
            queryBody += ` where ${opcoes.where};`;
        }

        const limiteFinal = opcoes.limit ? opcoes.limit : 10;
        queryBody += ` limit ${limiteFinal};`;

        const response = await fetch(`https://api.igdb.com/v4/${opcoes.endpoint}`, {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'text/plain'
            },
            body: queryBody
        });

        if (!response.ok) {
            throw new Error(`Erro na API do IGDB: ${response.statusText}`);
        }

        return await response.json();
    }
}