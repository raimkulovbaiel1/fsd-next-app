const features = [
  {
    title: 'Быстрая разработка',
    description: 'FSD позволяет быстро структурировать и масштабировать проект',
    icon: '⚡',
  },
  {
    title: 'Масштабируемость',
    description: 'Архитектура легко расширяется с ростом проекта',
    icon: '📈',
  },
  {
    title: 'Поддерживаемость',
    description: 'Четкая структура упрощает поддержку и развитие',
    icon: '🔧',
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Преимущества FSD
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
