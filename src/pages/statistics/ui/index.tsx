import { BackButton, Container } from "@box/shared/ui";
import { Footer } from "@box/widgets/footer";
import { Header } from "@box/widgets/header";
import { AppShell } from "@box/layouts";
import Head from "next/head";
import { RecycablePrices } from "@box/widgets/statistics/recyclables-prices";
import { EmployeesQuantity } from "@box/widgets/statistics/employees-quantity";
import { DealsStats } from "@box/widgets/statistics/deals-stats/ui";
import { ApplicationsStats } from "@box/widgets/statistics/applications-stats/ui";
import { RecyclablesVolumeStats } from "@box/widgets/statistics/recyclables-volume-stats/ui";
import { CompaniesStats } from "@box/widgets/statistics/companies-stats/ui";

export const Statistics = () => (
    <AppShell
      header={<Header />}
      footer={<Footer />}
    >
        <Head>
            <title>Статистика</title>
        </Head>
        <Container className="pt-[0px]">
            <div>
                <BackButton className='mb-[10px] text-sm'/>
                <div className="flex items-center gap-6">
                    <h1 className="font-normal text-2xl">Статистика</h1>
                </div>
            </div>
            <RecycablePrices/>
            <RecyclablesVolumeStats/>
            <ApplicationsStats/>
            <CompaniesStats/>
            <DealsStats/>
            <EmployeesQuantity/>
        </Container>
    </AppShell>
);