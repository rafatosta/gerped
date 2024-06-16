import Client, { ClientAttributes } from "../models/Client";


export const seedClients = async () => {
  try {
    const clientsData: ClientAttributes[] = [
      { name: 'Alexander Mcfadden', phone: '1-250-435-0839', course: 'Commodo At LLP', institute: 'Westbridge University' },
      { name: 'Phelan Hayden', phone: '1-213-505-6165', course: 'Lectus Associates', institute: 'Eastfield College' },
      { name: 'Stone Nichols', phone: '1-911-175-2394', course: 'Nec Leo Institute', institute: 'Northgate Institute' },
      { name: 'Latifah Gallagher', phone: '1-221-321-0549', course: 'Amet Metus Corp.', institute: 'Greenwood Academy' },
      { name: 'Keith Cervantes', phone: '(551) 708-7335', course: 'Eu Metus Corp.', institute: 'Hillside University' },
      { name: 'Arsenio Woodard', phone: '1-679-205-6634', course: 'Natoque Penatibus Et Limited', institute: 'Redwood College' },
      { name: 'Kelly Mckay', phone: '1-528-361-9831', course: 'Sapien Cras Limited', institute: 'Maplewood Institute' },
      { name: 'Josiah Brooks', phone: '1-267-164-7631', course: 'Facilisi Sed Foundation', institute: 'Lakeside University' },
      { name: 'Haley Silva', phone: '(112) 363-3326', course: 'Amet Foundation', institute: 'Sunset Academy' },
      { name: 'Quentin Alford', phone: '(760) 249-2202', course: 'Turpis Non Consulting', institute: 'Pinehill College' },
      { name: 'Lillian Sandoval', phone: '1-739-745-7711', course: 'Elit Elit Incorporated', institute: 'Cedarwood University' },
      { name: 'Adele Blair', phone: '(964) 475-7216', course: 'Dolor Dolor Ltd', institute: 'Riverstone Institute' },
      { name: 'Quintessa Charles', phone: '1-881-148-3241', course: 'Justo Proin LLC', institute: 'Brookfield College' },
      { name: 'Hyatt Nixon', phone: '1-658-387-4276', course: 'Erat Vel LLP', institute: 'Silverwood University' },
      { name: 'Kelsey Holman', phone: '(346) 436-6536', course: 'Sem Egestas Blandit Incorporated', institute: 'Oakwood Institute' },
      { name: 'Carson Barron', phone: '1-832-564-2891', course: 'Purus Mauris A LLC', institute: 'Kingswood University' },
      { name: 'Hayes Holt', phone: '1-592-162-8636', course: 'Eget Massa Sodales Foundation', institute: 'Clearwater College' },
      { name: 'Raya Petty', phone: '1-684-753-3913', course: 'Aenean Massa Company', institute: 'Briarwood Institute' },
      { name: 'Diana Bowers', phone: '(894) 526-8569', course: 'Risus Odio Auctor Industries', institute: 'Elkwood Academy' },
      { name: 'Gloria Guzman', phone: '1-337-472-2068', course: 'Mauris Ut Mi LLP', institute: 'Fairview College' },
      { name: 'Abel Conrad', phone: '(288) 589-1508', course: 'Magna LLC', institute: 'Harborview University' },
      { name: 'Harriet Nash', phone: '1-940-742-1801', course: 'Enim LLC', institute: 'Stonebridge Institute' },
      { name: 'Lee Velasquez', phone: '1-853-625-4783', course: 'Nullam Consulting', institute: 'Redstone University' },
      { name: 'Graiden Talley', phone: '1-977-658-3971', course: 'Pellentesque Ultricies Dignissim Corporation', institute: 'Westridge Academy' },
      { name: 'Alisa Fisher', phone: '(227) 215-9085', course: 'Et Ultrices Posuere Corporation', institute: 'Bridgewater College' },
      { name: 'Inez Logan', phone: '1-618-327-5077', course: 'Cursus LLP', institute: 'Bluefield Institute' },
      { name: 'Elvis Wright', phone: '1-788-742-2048', course: 'Feugiat Non Lobortis Limited', institute: 'Hillcrest University' },
      { name: 'Joelle Heath', phone: '(634) 680-5349', course: 'Duis Gravida Limited', institute: 'Evergreen College' },
      { name: 'Illiana Ortega', phone: '1-511-947-3014', course: 'Luctus Et Ultrices Inc.', institute: 'Clearwater University' },
      { name: 'Jakeem Norman', phone: '1-256-373-3081', course: 'Morbi Non Sapien LLP', institute: 'Woodland Institute' },
      { name: 'Rinah Mccormick', phone: '(623) 295-1449', course: 'Vel Sapien Limited', institute: 'Eastgate College' }
    ];

    await Client.bulkCreate(clientsData);

  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
};
