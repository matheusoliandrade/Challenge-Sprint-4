import React from 'react';
import './Catalogos.css';


const Catalogos = () => {
  const services = [
    {
      id: 1,
      name: 'Emissão de Documentos',
      description: 'Facilita a emissão de documentos essenciais como RG e CPF. O serviço oferece orientações e suporte durante o processo, garantindo praticidade e eficiência.',
      icon: '📝',
      image: 'data:image/jpeg;base64,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',
    },
    {
      id: 2,
      name: 'Agendamento de Consultas',
      description: 'Permite o agendamento de consultas médicas de forma online. Com um sistema simplificado, você pode escolher a especialidade e a data que melhor atendem suas necessidades.',
      icon: '📅',
      image: 'https://cemad.com.br/wp-content/uploads/2021/11/benefIcios-da-consulta-de-rotina-clinica-cemad-florianopolis-sc.jpg',
    },
    {
      id: 3,
      name: 'Apoio ao Empreendedor',
      description: 'Oferece consultoria e suporte para pequenos empreendedores. O serviço abrange orientações sobre formalização de negócios e acesso a recursos e financiamentos.',
      icon: '💼',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dsw8l5a6GpfRoE4r9bN57ljmHU6mmrgwqQ&s',
    },
    {
      id: 4,
      name: 'Serviços de Educação',
      description: 'Disponibiliza cursos e oficinas gratuitos para capacitação profissional. O objetivo é proporcionar desenvolvimento de habilidades que ampliem oportunidades de emprego.',
      icon: '📚',
      image: 'https://s3.static.brasilescola.uol.com.br/img/2018/11/educacao-infantil.jpeg',
    },
    {
      id: 5,
      name: 'Orientação Jurídica',
      description: 'Fornece consultas jurídicas gratuitas, ajudando a população a entender melhor seus direitos. O serviço é essencial para esclarecimento de questões legais e resolução de conflitos.',
      icon: '⚖️',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnlFFCsUXJ0uYr5EzZi-M1QO0jHGErlzBpA&s',
    },
    {
      id: 6,
      name: 'Suporte Psicossocial',
      description: 'Oferece apoio psicológico e social para indivíduos e famílias em vulnerabilidade. O foco é proporcionar suporte emocional e auxiliar na busca por recursos e serviços comunitários.',
      icon: '🧠',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKvDm-Pfttuy7Ej34_roxm0TQEwLecn_wPA&s',
    },
  ];

  return (
    <div className="catalog-container">
      <h1>Catálogo de Serviços</h1>
      <div className="catalog-grid">
        {services.map(service => (
          <div key={service.id} className="catalog-item">
            <img src={service.image} alt={service.name} className="item-image" />
            <div className="item-icon">{service.icon}</div>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogos;
