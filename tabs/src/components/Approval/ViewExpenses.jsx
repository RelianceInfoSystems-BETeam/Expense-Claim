import React from 'react';
import { useData } from "@microsoft/teamsfx-react";

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

	
export default function ViewExpenses({ apiClient }) {
   

  const { loading, data, error, reload } = useData(async () => {
    const response = await apiClient.get("Expenses");
    return response.data;
});

let MyExpenses = {nodes: data};
const theme = useTheme(getTheme());

  return (
<div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="card">
                    <h3 className=' card-header'>Approval Record</h3>
                    <div class="card-body">
                       {data && <div className="content-body">
                          <CompactTable 
                              columns={[
                                  { label: 'ID', renderCell: (item) => item?.RequestID, resize: true },
                                  { label: 'Name', renderCell: (item) => item?.Name, resize: true },
                                  { label: 'Type', renderCell: (item) => item?.Amount, resize: true },
                                  { label: 'Cycle Period', renderCell: (item) => item?.Description, resize: true },
                                  { label: 'Day(s)', renderCell: (item) => item?.Date, resize: true },
                              ]} 
                              data={MyExpenses} 
                              theme={theme} 
                          />
                      </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  
  )
}
