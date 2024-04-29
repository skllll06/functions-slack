export interface KnowledgeGraphResponse {
  data: {
    itemListElement: Array<{
      result: {
        name?: string;
        description?: string;
        detailedDescription?: {
          url?: string;
          articleBody?: string;
        };
        image?: {
          contentUrl?: string;
        };
      };
    }>;
  };
}

export interface SlackAttachment {
  color?: string;
  title?: string;
  title_link?: string;
  text?: string;
  image_url?: string;
}

export interface SlackMessage {
  response_type: string;
  text: string;
  attachments: SlackAttachment[];
}
