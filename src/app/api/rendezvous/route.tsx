import axios from 'axios';

import { NextResponse } from 'next/server'

export async function POST(req: any) {
  const body = await req.json()
  console.log(body);

  const { notaryId, clientName, clientEmail, startDateTime, endDateTime, description } = req.body;

  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  try {
    const accessToken = await getAccessToken();

    const calendarEvent = {
      subject: `Rendez-vous avec ${clientName}`,
      body: {
        contentType: 'HTML',
        content: description || 'Détails du rendez-vous',
      },
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Paris',
      },
      attendees: [
        {
          emailAddress: {
            address: clientEmail,
            name: clientName,
          },
          type: 'required',
        },
      ],
    };

    console.log(calendarEvent);

    const response = await axios.post(
      `https://graph.microsoft.com/v1.0/users/${notaryId}/events`,
      calendarEvent,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Réponse de Microsoft Graph:", response.data);

    await axios.post(
      `${strapiUrl}/appointments`,
      {
        data: {
          clientName,
          clientEmail,
          startDateTime,
          description,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
        },
      }
    );

  } catch (error: any) {
    // Log de l'erreur détaillée
    console.error('Erreur lors de la création de l\'événement :', error);

    if (error.response) {
      // Requête envoyée et le serveur a répondu avec un code de statut qui sort de la plage des 2xx
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('Aucune réponse reçue pour la requête :', error.request);
    } else {
      // Quelque chose s'est passé en configurant la requête qui a provoqué l'erreur
      console.error('Erreur lors de la configuration de la requête :', error.message);
    }

    return NextResponse.json({
      message: 'Erreur lors de la création de l\'événement',
      error: error.message,
      details: error.response?.data || null,
    }, {
      status: 403,
    });
  }

  return NextResponse.json({
    message: "success"
  }, {
    status: 200,
  })
}

async function getAccessToken() {
  const url = `https://login.microsoftonline.com/${process.env.MS_GRAPH_TENANT_ID}/oauth2/v2.0/token`;
  const params = new URLSearchParams();
  params.append('client_id', process.env.MS_GRAPH_CLIENT_ID!);
  params.append('scope', 'https://graph.microsoft.com/.default');
  params.append('client_secret', process.env.MS_GRAPH_CLIENT_SECRET!);
  params.append('grant_type', 'client_credentials');

  try {
    const response = await axios.post(url, params);
    return response.data.access_token;
  } catch (error) {
    console.error('Erreur lors de l\'obtention du token d\'accès:', error);
    throw new Error('Erreur de récupération du token');
  }
}
