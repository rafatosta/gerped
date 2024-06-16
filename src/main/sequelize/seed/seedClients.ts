import Client, { ClientAttributes } from "../models/Client";


export const seedClients = async () => {
  try {
    const clientsData: ClientAttributes[] = [
      { name: 'Alexander Mcfadden', phone: '1-250-435-0839', course: 'Commodo At LLP' },
      { name: 'Phelan Hayden', phone: '1-213-505-6165', course: 'Lectus Associates' },
      { name: 'Stone Nichols', phone: '1-911-175-2394', course: 'Nec Leo Institute' },
      { name: 'Latifah Gallagher', phone: '1-221-321-0549', course: 'Amet Metus Corp.' },
      { name: 'Keith Cervantes', phone: '(551) 708-7335', course: 'Eu Metus Corp.' },
      { name: 'Arsenio Woodard', phone: '1-679-205-6634', course: 'Natoque Penatibus Et Limited' },
      { name: 'Kelly Mckay', phone: '1-528-361-9831', course: 'Sapien Cras Limited' },
      { name: 'Josiah Brooks', phone: '1-267-164-7631', course: 'Facilisi Sed Foundation' },
      { name: 'Haley Silva', phone: '(112) 363-3326', course: 'Amet Foundation' },
      { name: 'Quentin Alford', phone: '(760) 249-2202', course: 'Turpis Non Consulting' },
      { name: 'Lillian Sandoval', phone: '1-739-745-7711', course: 'Elit Elit Incorporated' },
      { name: 'Adele Blair', phone: '(964) 475-7216', course: 'Dolor Dolor Ltd' },
      { name: 'Quintessa Charles', phone: '1-881-148-3241', course: 'Justo Proin LLC' },
      { name: 'Hyatt Nixon', phone: '1-658-387-4276', course: 'Erat Vel LLP' },
      { name: 'Kelsey Holman', phone: '(346) 436-6536', course: 'Sem Egestas Blandit Incorporated' }
    ];


    await Client.bulkCreate(clientsData);

  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
};
