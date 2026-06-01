const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create Frameworks
  const nist = await prisma.framework.upsert({
    where: { id: 'nist-ai-rmf-1.0' },
    update: {},
    create: {
      id: 'nist-ai-rmf-1.0',
      name: 'NIST AI RMF 1.0',
      description: 'NIST Artificial Intelligence Risk Management Framework 1.0',
    },
  });

  const iso = await prisma.framework.upsert({
    where: { id: 'iso-42001-2023' },
    update: {},
    create: {
      id: 'iso-42001-2023',
      name: 'ISO/IEC 42001:2023',
      description: 'Information technology — Artificial intelligence — Management system',
    },
  });

  // 2. NIST Functions & Categories (Simplified for brevity but structured)
  const nistFunctions = [
    {
      code: 'GOVERN',
      title: 'GOVERN',
      categories: [
        { code: 'GOVERN 1', title: 'Policies, processes, and procedures are in place' },
        { code: 'GOVERN 2', title: 'Accountability and structures are in place' },
        { code: 'GOVERN 3', title: 'Workforce is diverse and multidisciplinary' },
      ],
    },
    {
      code: 'MAP',
      title: 'MAP',
      categories: [
        { code: 'MAP 1', title: 'Context is established and understood' },
        { code: 'MAP 2', title: 'Categorization of the AI system is performed' },
      ],
    },
    {
      code: 'MEASURE',
      title: 'MEASURE',
      categories: [
        { code: 'MEASURE 1', title: 'Appropriate methods and metrics are identified' },
      ],
    },
    {
      code: 'MANAGE',
      title: 'MANAGE',
      categories: [
        { code: 'MANAGE 1', title: 'AI risks are prioritized and responded to' },
      ],
    },
  ];

  for (const func of nistFunctions) {
    const parent = await prisma.control.create({
      data: {
        frameworkId: nist.id,
        code: func.code,
        title: func.title,
      },
    });

    for (const cat of func.categories) {
      await prisma.control.create({
        data: {
          frameworkId: nist.id,
          parentId: parent.id,
          code: cat.code,
          title: cat.title,
        },
      });
    }
  }

  // 3. ISO Annex A (Simplified)
  const isoControls = [
    { code: 'A.2', title: 'Policies related to AI' },
    { code: 'A.3', title: 'Internal organization' },
    { code: 'A.4', title: 'Resources for AI' },
    { code: 'A.5', title: 'Assessing AI impacts' },
    { code: 'A.6', title: 'AI system life cycle' },
    { code: 'A.7', title: 'Data for AI systems' },
    { code: 'A.8', title: 'Information for interested parties' },
    { code: 'A.9', title: 'Use of AI systems' },
    { code: 'A.10', title: 'Third-party relationships' },
  ];

  for (const ctrl of isoControls) {
    await prisma.control.create({
      data: {
        frameworkId: iso.id,
        code: ctrl.code,
        title: ctrl.title,
      },
    });
  }

  // 4. Create a Default Admin User
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'password123', // In a real app, hash this!
      name: 'System Admin',
      role: 'ADMIN',
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
