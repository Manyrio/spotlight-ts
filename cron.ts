import { syncAnnonces } from '@/app/api/annonces/[id]/route';
import cron from 'node-cron';

cron.schedule('0 0 * * *', async () => {

  console.log('Running syncAnnonces at midnight...');
  try {
    await syncAnnonces();
    console.log('syncAnnonces completed successfully');
  } catch (error) {
    console.error('Error running syncAnnonces:', error);
  }
});

console.log('Cron job scheduled. Running independently of Next.js routes.');
