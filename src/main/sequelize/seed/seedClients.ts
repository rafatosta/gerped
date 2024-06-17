import Client, { ClientAttributes } from "../models/Client";


export const seedClients = async () => {
  try {
    const clientsData: ClientAttributes[] = [
      { name: 'Alexander Mcfadden', phone: '1-250-435-0839', course: 'Commodo At LLP', institute: 'Westbridge University', email: 'alexander.mcfadden@westbridge.edu' },
      { name: 'Phelan Hayden', phone: '1-213-505-6165', course: 'Lectus Associates', institute: 'Eastfield College', email: 'phelan.hayden@eastfield.edu' },
      { name: 'Stone Nichols', phone: '1-911-175-2394', course: 'Nec Leo Institute', institute: 'Northgate Institute', email: 'stone.nichols@northgate.edu' },
      { name: 'Latifah Gallagher', phone: '1-221-321-0549', course: 'Amet Metus Corp.', institute: 'Greenwood Academy', email: 'latifah.gallagher@greenwood.edu' },
      { name: 'Keith Cervantes', phone: '(551) 708-7335', course: 'Eu Metus Corp.', institute: 'Hillside University', email: 'keith.cervantes@hillside.edu' },
      { name: 'Arsenio Woodard', phone: '1-679-205-6634', course: 'Natoque Penatibus Et Limited', institute: 'Redwood College', email: 'arsenio.woodard@redwood.edu' },
      { name: 'Kelly Mckay', phone: '1-528-361-9831', course: 'Sapien Cras Limited', institute: 'Maplewood Institute', email: 'kelly.mckay@maplewood.edu' },
      { name: 'Josiah Brooks', phone: '1-267-164-7631', course: 'Facilisi Sed Foundation', institute: 'Lakeside University', email: 'josiah.brooks@lakeside.edu' },
      { name: 'Haley Silva', phone: '(112) 363-3326', course: 'Amet Foundation', institute: 'Sunset Academy', email: 'haley.silva@sunset.edu' },
      { name: 'Quentin Alford', phone: '(760) 249-2202', course: 'Turpis Non Consulting', institute: 'Pinehill College', email: 'quentin.alford@pinehill.edu' },
      { name: 'Lillian Sandoval', phone: '1-739-745-7711', course: 'Elit Elit Incorporated', institute: 'Cedarwood University', email: 'lillian.sandoval@cedarwood.edu' },
      { name: 'Adele Blair', phone: '(964) 475-7216', course: 'Dolor Dolor Ltd', institute: 'Riverstone Institute', email: 'adele.blair@riverstone.edu' },
      { name: 'Quintessa Charles', phone: '1-881-148-3241', course: 'Justo Proin LLC', institute: 'Brookfield College', email: 'quintessa.charles@brookfield.edu' },
      { name: 'Hyatt Nixon', phone: '1-658-387-4276', course: 'Erat Vel LLP', institute: 'Silverwood University', email: 'hyatt.nixon@silverwood.edu' },
      { name: 'Kelsey Holman', phone: '(346) 436-6536', course: 'Sem Egestas Blandit Incorporated', institute: 'Oakwood Institute', email: 'kelsey.holman@oakwood.edu' },
      { name: 'Carson Barron', phone: '1-832-564-2891', course: 'Purus Mauris A LLC', institute: 'Kingswood University', email: 'carson.barron@kingswood.edu' },
      { name: 'Hayes Holt', phone: '1-592-162-8636', course: 'Eget Massa Sodales Foundation', institute: 'Clearwater College', email: 'hayes.holt@clearwater.edu' },
      { name: 'Raya Petty', phone: '1-684-753-3913', course: 'Aenean Massa Company', institute: 'Briarwood Institute', email: 'raya.petty@briarwood.edu' },
      { name: 'Diana Bowers', phone: '(894) 526-8569', course: 'Risus Odio Auctor Industries', institute: 'Elkwood Academy', email: 'diana.bowers@elkwood.edu' },
      { name: 'Gloria Guzman', phone: '1-337-472-2068', course: 'Mauris Ut Mi LLP', institute: 'Fairview College', email: 'gloria.guzman@fairview.edu' },
      { name: 'Abel Conrad', phone: '(288) 589-1508', course: 'Magna LLC', institute: 'Harborview University', email: 'abel.conrad@harborview.edu' },
      { name: 'Harriet Nash', phone: '1-940-742-1801', course: 'Enim LLC', institute: 'Stonebridge Institute', email: 'harriet.nash@stonebridge.edu' },
      { name: 'Lee Velasquez', phone: '1-853-625-4783', course: 'Nullam Consulting', institute: 'Redstone University', email: 'lee.velasquez@redstone.edu' },
      { name: 'Graiden Talley', phone: '1-977-658-3971', course: 'Pellentesque Ultricies Dignissim Corporation', institute: 'Westridge Academy', email: 'graiden.talley@westridge.edu' },
      { name: 'Alisa Fisher', phone: '(227) 215-9085', course: 'Et Ultrices Posuere Corporation', institute: 'Bridgewater College', email: 'alisa.fisher@bridgewater.edu' },
      { name: 'Inez Logan', phone: '1-618-327-5077', course: 'Cursus LLP', institute: 'Bluefield Institute', email: 'inez.logan@bluefield.edu' },
      { name: 'Elvis Wright', phone: '1-788-742-2048', course: 'Feugiat Non Lobortis Limited', institute: 'Hillcrest University', email: 'elvis.wright@hillcrest.edu' },
      { name: 'Joelle Heath', phone: '(634) 680-5349', course: 'Duis Gravida Limited', institute: 'Evergreen College', email: 'joelle.heath@evergreen.edu' },
      { name: 'Illiana Ortega', phone: '1-511-947-3014', course: 'Luctus Et Ultrices Inc.', institute: 'Clearwater University', email: 'illiana.ortega@clearwater.edu' },
      { name: 'Jakeem Norman', phone: '1-256-373-3081', course: 'Morbi Non Sapien LLP', institute: 'Woodland Institute', email: 'jakeem.norman@woodland.edu' },
      { name: 'Rinah Mccormick', phone: '(623) 295-1449', course: 'Vel Sapien Limited', institute: 'Eastgate College', email: 'rinah.mccormick@eastgate.edu' }
    ];

    await Client.bulkCreate(clientsData);

  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
};
