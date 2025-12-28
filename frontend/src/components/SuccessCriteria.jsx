import React from 'react';
import { Target } from 'lucide-react';

const SuccessCriteria = ({ value, onChange, disabled }) => {
    return (
        <div className="mb-4">
            <div className="relative group">
                <div className="absolute top-3 left-3 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                    <Target className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    placeholder="Define how SideKick should evaluate success (optional)"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
            </div>
        </div>
    );
};

export default SuccessCriteria;
