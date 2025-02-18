import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
   ContractPage,
   CreateContractPage,
   CreateTransactionPage,
   EditContractPage,
   EditTransactionPage,
   JournalPage, AnalyticsPage, NotificationsPage, ContractsPage,
} from 'pages';
import { Aside, Nav } from 'components';
import { AppContainer, AppMain } from './styled';

function App() {
   return (
      <Router>
         <AppContainer>
            <Nav />
            <AppMain>
               <Aside />
               <Routes>
                  <Route path="/" element={<CreateTransactionPage />} />
                  <Route path="/transaction/:id/edit" element={<EditTransactionPage />} />
                  <Route path="/contracts/create" element={<CreateContractPage />} />
                  <Route path="/contracts/:id/edit" element={<EditContractPage />} />
                  <Route path="/contracts/:id" element={<ContractPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/contracts" element={<ContractsPage />} />
               </Routes>
            </AppMain>
         </AppContainer>
      </Router>
   );
}

export default App;