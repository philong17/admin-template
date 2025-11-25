import AppHeader from '@/shared/components/AppHeader/AppHeader';
import MainContainer from '@/shared/components/containers/MainContainer';
import PageContainer from '@/shared/components/containers/PageContainer';
import { Title, Text, Card, SimpleGrid } from '@mantine/core';

const DashboardPage = () => {
  const titleItems = [{ title: 'Dashboard' }, { title: 'Overview', href: '/dashboard' }];

  return (
    <MainContainer>
      <AppHeader pageTitle='Dashboard' titleItems={titleItems} />

      <PageContainer className='space-y-8'>
        {/* Welcome Section */}
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Title order={2} mb='md'>
            Welcome to Admin Dashboard
          </Title>
          <Text c='dimmed'>This is a barebone admin template. Start building your features here.</Text>
        </Card>

        {/* Example Stats Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing='lg'>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Text size='sm' c='dimmed'>
              Total Users
            </Text>
            <Title order={3}>0</Title>
          </Card>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Text size='sm' c='dimmed'>
              Active Sessions
            </Text>
            <Title order={3}>0</Title>
          </Card>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Text size='sm' c='dimmed'>
              Revenue
            </Text>
            <Title order={3}>$0</Title>
          </Card>
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Text size='sm' c='dimmed'>
              Pending Tasks
            </Text>
            <Title order={3}>0</Title>
          </Card>
        </SimpleGrid>
      </PageContainer>
    </MainContainer>
  );
};

export default DashboardPage;
