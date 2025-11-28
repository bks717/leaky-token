import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AlgorithmType, SimulationStep } from '../types';
import { Printer, Loader2, Sparkles } from 'lucide-react';

interface ReportProps {
  lastRun: {
    algo: AlgorithmType;
    data: SimulationStep[];
    params: any;
  } | null;
}

const Report: React.FC<ReportProps> = ({ lastRun }) => {
  const [loading, setLoading] = useState(false);
  const [reportContent, setReportContent] = useState<{
    abstract: string;
    conclusion: string;
    futureScope: string;
  } | null>(null);

  const generateReport = async () => {
    if (!lastRun) return;
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const totalSent = lastRun.data.reduce((acc, step) => acc + step.sent, 0);
      const totalDropped = lastRun.data.reduce((acc, step) => acc + step.dropped, 0);
      const totalIncoming = lastRun.data.reduce((acc, step) => acc + step.incoming, 0);
      const lossRate = ((totalDropped / totalIncoming) * 100).toFixed(2);

      const prompt = `
        Act as a Computer Networks student writing a lab project report.
        Experiment: ${lastRun.algo === 'leaky' ? 'Leaky Bucket' : 'Token Bucket'} Traffic Shaping.
        
        Parameters:
        - Capacity: ${lastRun.params.bucketCapacity}
        - Rate: ${lastRun.params.outflowRate || lastRun.params.tokenRate}
        
        Results:
        - Total Packets In: ${totalIncoming}
        - Total Packets Sent: ${totalSent}
        - Total Dropped: ${totalDropped}
        - Loss Rate: ${lossRate}%
        
        Generate a JSON object with 3 fields (plain strings, no markdown formatting inside the values):
        1. "abstract": A concise paragraph summarizing the experiment and result.
        2. "conclusion": A paragraph explaining why the loss occurred (or didn't) based on the bursty input vs fixed rate.
        3. "futureScope": Two bullet points on how this project could be extended (e.g. WFQ, real network trace).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
      });
      
      const text = response.text;
      if (text) {
          setReportContent(JSON.parse(text));
      }

    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setLoading(false);
    }
  };

  if (!lastRun) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
        <p className="text-slate-500">Run a simulation first to generate a report.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 print:w-full">
      <div className="flex justify-between items-center no-print">
        <h2 className="text-2xl font-bold text-slate-800">Project Report</h2>
        <div className="flex gap-2">
            {!reportContent && (
                <button 
                onClick={generateReport}
                disabled={loading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                Generate with AI
                </button>
            )}
            <button 
            onClick={() => window.print()}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 flex items-center gap-2"
            >
            <Printer size={16} /> Print / Save PDF
            </button>
        </div>
      </div>

      {/* Report Paper */}
      <div className="bg-white p-12 shadow-lg print:shadow-none print:p-0 min-h-[800px]">
        <div className="text-center border-b border-slate-900 pb-8 mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Traffic Shaping Simulation</h1>
          <h2 className="text-xl text-slate-600">Computer Networks Mini-Project</h2>
          <div className="mt-4 text-sm text-slate-500">
            <p><strong>Topic:</strong> {lastRun.algo === 'leaky' ? 'Leaky Bucket' : 'Token Bucket'} Algorithm</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-2 border-b border-slate-200 inline-block">1. Abstract</h3>
            <p className="text-slate-700 leading-relaxed text-justify">
              {reportContent ? reportContent.abstract : "Generate the report to see the abstract..."}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-2 border-b border-slate-200 inline-block">2. Methodology</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
                The simulation implements the <strong>{lastRun.algo === 'leaky' ? 'Leaky Bucket' : 'Token Bucket'}</strong> algorithm. 
                The system takes a bursty stream of packets as input and attempts to regulate the output rate.
            </p>
            <ul className="list-disc list-inside text-slate-700 ml-4">
                <li><strong>Bucket Capacity:</strong> {lastRun.params.bucketCapacity} units</li>
                <li><strong>Processing Rate:</strong> {lastRun.params.outflowRate || lastRun.params.tokenRate} units/sec</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-2 border-b border-slate-200 inline-block">3. Results</h3>
            <div className="mt-4 border border-slate-300 rounded">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 border-b border-slate-300">
                        <tr>
                            <th className="p-2">Metric</th>
                            <th className="p-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-200">
                            <td className="p-2 font-semibold">Total Packets Received</td>
                            <td className="p-2">{lastRun.data.reduce((a,b) => a + b.incoming, 0)}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="p-2 font-semibold">Total Packets Sent</td>
                            <td className="p-2">{lastRun.data.reduce((a,b) => a + b.sent, 0)}</td>
                        </tr>
                        <tr>
                            <td className="p-2 font-semibold">Packets Dropped</td>
                            <td className="p-2 text-red-600 font-bold">{lastRun.data.reduce((a,b) => a + b.dropped, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Show a snapshot of the logs for the report */}
            <p className="text-xs text-slate-500 mt-2 italic">Table 1: Summary of Simulation Metrics</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-2 border-b border-slate-200 inline-block">4. Conclusion</h3>
            <p className="text-slate-700 leading-relaxed text-justify">
               {reportContent ? reportContent.conclusion : "Generate the report to see the conclusion..."}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-2 border-b border-slate-200 inline-block">5. Future Scope</h3>
            <div className="text-slate-700 leading-relaxed">
               {reportContent ? (
                  <ul className="list-disc list-inside">
                     {Array.isArray(reportContent.futureScope) ? 
                        reportContent.futureScope.map((item: any, i: number) => <li key={i}>{item}</li>) 
                        : reportContent.futureScope}
                  </ul>
               ) : "Generate the report to see future scope..."}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;